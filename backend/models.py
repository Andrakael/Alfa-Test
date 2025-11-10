from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="usuario")  # admin, gerente, usuario
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    produtos = relationship("Produto", back_populates="owner")
    clientes = relationship("Cliente", back_populates="owner")
    categorias = relationship("Categoria", back_populates="owner")
    transacoes = relationship("Transacao", back_populates="owner")

class Categoria(Base):
    __tablename__ = "categorias"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    descricao = Column(Text)
    cor = Column(String, default="#3B82F6")
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="categorias")
    produtos = relationship("Produto", back_populates="categoria")

class Produto(Base):
    __tablename__ = "produtos"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    valor = Column(Float, nullable=False)
    quantidade = Column(Integer, default=0)
    descricao = Column(Text)
    categoria_id = Column(Integer, ForeignKey("categorias.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="produtos")
    categoria = relationship("Categoria", back_populates="produtos")
    transacoes = relationship("Transacao", back_populates="produto")

class Cliente(Base):
    __tablename__ = "clientes"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    email = Column(String)
    telefone = Column(String)
    endereco = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="clientes")
    transacoes = relationship("Transacao", back_populates="cliente")

class Transacao(Base):
    __tablename__ = "transacoes"
    
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, nullable=False)  # entrada ou saida
    produto_id = Column(Integer, ForeignKey("produtos.id"))
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=True)
    quantidade = Column(Integer, nullable=False)
    valor_unitario = Column(Float, nullable=False)
    valor_total = Column(Float, nullable=False)
    numero_pedido = Column(String, nullable=True)
    observacoes = Column(Text, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    owner = relationship("User", back_populates="transacoes")
    produto = relationship("Produto", back_populates="transacoes")
    cliente = relationship("Cliente", back_populates="transacoes")
