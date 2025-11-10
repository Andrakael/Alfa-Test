from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    username: str
    email: Optional[str] = None
    role: str = "usuario"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# Categoria Schemas
class CategoriaBase(BaseModel):
    nome: str
    descricao: Optional[str] = None
    cor: str = "#3B82F6"

class CategoriaCreate(CategoriaBase):
    pass

class Categoria(CategoriaBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Produto Schemas
class ProdutoBase(BaseModel):
    nome: str
    valor: float
    quantidade: int = 0
    descricao: Optional[str] = None
    categoria_id: Optional[int] = None

class ProdutoCreate(ProdutoBase):
    pass

class ProdutoUpdate(BaseModel):
    nome: Optional[str] = None
    valor: Optional[float] = None
    quantidade: Optional[int] = None
    descricao: Optional[str] = None
    categoria_id: Optional[int] = None

class Produto(ProdutoBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Cliente Schemas
class ClienteBase(BaseModel):
    nome: str
    email: Optional[str] = None
    telefone: Optional[str] = None
    endereco: Optional[str] = None

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[str] = None
    telefone: Optional[str] = None
    endereco: Optional[str] = None

class Cliente(ClienteBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Transacao Schemas
class TransacaoBase(BaseModel):
    tipo: str  # entrada ou saida
    produto_id: int
    cliente_id: Optional[int] = None
    quantidade: int
    valor_unitario: float
    valor_total: float
    numero_pedido: Optional[str] = None
    observacoes: Optional[str] = None

class TransacaoCreate(TransacaoBase):
    pass

class Transacao(TransacaoBase):
    id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
