from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta

from backend import models, schemas, auth
from backend.database import engine, get_db

# Criar tabelas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="NEXUS API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, especifique os domínios
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== AUTH ====================

@app.post("/api/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Registrar novo usuário"""
    # Verificar se usuário já existe
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username já registrado")
    
    # Criar usuário
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/api/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login e obter token"""
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/api/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    """Obter usuário atual"""
    return current_user

# ==================== CATEGORIAS ====================

@app.get("/api/categorias", response_model=List[schemas.Categoria])
def get_categorias(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Listar todas as categorias do usuário"""
    return db.query(models.Categoria).filter(models.Categoria.user_id == current_user.id).all()

@app.post("/api/categorias", response_model=schemas.Categoria)
def create_categoria(
    categoria: schemas.CategoriaCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Criar nova categoria"""
    auth.check_permission(current_user, "gerente")
    
    db_categoria = models.Categoria(**categoria.dict(), user_id=current_user.id)
    db.add(db_categoria)
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@app.put("/api/categorias/{categoria_id}", response_model=schemas.Categoria)
def update_categoria(
    categoria_id: int,
    categoria: schemas.CategoriaCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Atualizar categoria"""
    auth.check_permission(current_user, "gerente")
    
    db_categoria = db.query(models.Categoria).filter(
        models.Categoria.id == categoria_id,
        models.Categoria.user_id == current_user.id
    ).first()
    
    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    
    for key, value in categoria.dict().items():
        setattr(db_categoria, key, value)
    
    db.commit()
    db.refresh(db_categoria)
    return db_categoria

@app.delete("/api/categorias/{categoria_id}")
def delete_categoria(
    categoria_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Deletar categoria"""
    auth.check_permission(current_user, "gerente")
    
    db_categoria = db.query(models.Categoria).filter(
        models.Categoria.id == categoria_id,
        models.Categoria.user_id == current_user.id
    ).first()
    
    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    
    db.delete(db_categoria)
    db.commit()
    return {"message": "Categoria deletada com sucesso"}

# ==================== PRODUTOS ====================

@app.get("/api/produtos", response_model=List[schemas.Produto])
def get_produtos(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Listar todos os produtos do usuário"""
    return db.query(models.Produto).filter(models.Produto.user_id == current_user.id).all()

@app.post("/api/produtos", response_model=schemas.Produto)
def create_produto(
    produto: schemas.ProdutoCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Criar novo produto"""
    auth.check_permission(current_user, "gerente")
    
    db_produto = models.Produto(**produto.dict(), user_id=current_user.id)
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto

@app.put("/api/produtos/{produto_id}", response_model=schemas.Produto)
def update_produto(
    produto_id: int,
    produto: schemas.ProdutoUpdate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Atualizar produto"""
    auth.check_permission(current_user, "gerente")
    
    db_produto = db.query(models.Produto).filter(
        models.Produto.id == produto_id,
        models.Produto.user_id == current_user.id
    ).first()
    
    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    for key, value in produto.dict(exclude_unset=True).items():
        setattr(db_produto, key, value)
    
    db.commit()
    db.refresh(db_produto)
    return db_produto

@app.delete("/api/produtos/{produto_id}")
def delete_produto(
    produto_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Deletar produto"""
    auth.check_permission(current_user, "gerente")
    
    db_produto = db.query(models.Produto).filter(
        models.Produto.id == produto_id,
        models.Produto.user_id == current_user.id
    ).first()
    
    if not db_produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    db.delete(db_produto)
    db.commit()
    return {"message": "Produto deletado com sucesso"}

# ==================== CLIENTES ====================

@app.get("/api/clientes", response_model=List[schemas.Cliente])
def get_clientes(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Listar todos os clientes do usuário"""
    return db.query(models.Cliente).filter(models.Cliente.user_id == current_user.id).all()

@app.post("/api/clientes", response_model=schemas.Cliente)
def create_cliente(
    cliente: schemas.ClienteCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Criar novo cliente"""
    auth.check_permission(current_user, "gerente")
    
    db_cliente = models.Cliente(**cliente.dict(), user_id=current_user.id)
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

@app.put("/api/clientes/{cliente_id}", response_model=schemas.Cliente)
def update_cliente(
    cliente_id: int,
    cliente: schemas.ClienteUpdate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Atualizar cliente"""
    auth.check_permission(current_user, "gerente")
    
    db_cliente = db.query(models.Cliente).filter(
        models.Cliente.id == cliente_id,
        models.Cliente.user_id == current_user.id
    ).first()
    
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    for key, value in cliente.dict(exclude_unset=True).items():
        setattr(db_cliente, key, value)
    
    db.commit()
    db.refresh(db_cliente)
    return db_cliente

@app.delete("/api/clientes/{cliente_id}")
def delete_cliente(
    cliente_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Deletar cliente"""
    auth.check_permission(current_user, "gerente")
    
    db_cliente = db.query(models.Cliente).filter(
        models.Cliente.id == cliente_id,
        models.Cliente.user_id == current_user.id
    ).first()
    
    if not db_cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    db.delete(db_cliente)
    db.commit()
    return {"message": "Cliente deletado com sucesso"}

# ==================== TRANSAÇÕES ====================

@app.get("/api/transacoes", response_model=List[schemas.Transacao])
def get_transacoes(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Listar todas as transações do usuário"""
    return db.query(models.Transacao).filter(models.Transacao.user_id == current_user.id).all()

@app.post("/api/transacoes", response_model=schemas.Transacao)
def create_transacao(
    transacao: schemas.TransacaoCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Criar nova transação"""
    # Todos podem criar vendas (saída), mas só gerente+ pode criar entradas
    if transacao.tipo == "entrada":
        auth.check_permission(current_user, "gerente")
    
    # Atualizar estoque do produto
    produto = db.query(models.Produto).filter(
        models.Produto.id == transacao.produto_id,
        models.Produto.user_id == current_user.id
    ).first()
    
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    if transacao.tipo == "entrada":
        produto.quantidade += transacao.quantidade
    else:  # saida
        if produto.quantidade < transacao.quantidade:
            raise HTTPException(status_code=400, detail="Estoque insuficiente")
        produto.quantidade -= transacao.quantidade
    
    db_transacao = models.Transacao(**transacao.dict(), user_id=current_user.id)
    db.add(db_transacao)
    db.commit()
    db.refresh(db_transacao)
    return db_transacao

@app.delete("/api/transacoes/{transacao_id}")
def delete_transacao(
    transacao_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    """Desfazer transação"""
    auth.check_permission(current_user, "gerente")
    
    db_transacao = db.query(models.Transacao).filter(
        models.Transacao.id == transacao_id,
        models.Transacao.user_id == current_user.id
    ).first()
    
    if not db_transacao:
        raise HTTPException(status_code=404, detail="Transação não encontrada")
    
    # Reverter estoque
    produto = db.query(models.Produto).filter(models.Produto.id == db_transacao.produto_id).first()
    if produto:
        if db_transacao.tipo == "entrada":
            produto.quantidade -= db_transacao.quantidade
        else:
            produto.quantidade += db_transacao.quantidade
    
    db.delete(db_transacao)
    db.commit()
    return {"message": "Transação desfeita com sucesso"}

# ==================== ROOT ====================

@app.get("/")
def root():
    return {
        "message": "NEXUS API - Sistema de Gestão de Estoque",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    import os
    
    # Railway fornece a porta via variável de ambiente
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
