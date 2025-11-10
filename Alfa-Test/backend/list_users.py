"""Script para listar todos os usuários"""
from sqlalchemy.orm import Session
import models
from database import SessionLocal

def list_users():
    db = SessionLocal()
    try:
        users = db.query(models.User).all()
        
        if users:
            print("✅ Usuários cadastrados:")
            print("-" * 60)
            for user in users:
                print(f"ID: {user.id}")
                print(f"Username: {user.username}")
                print(f"Email: {user.email}")
                print(f"Role: {user.role}")
                print(f"Criado em: {user.created_at}")
                print("-" * 60)
        else:
            print("❌ Nenhum usuário cadastrado")
            
    except Exception as e:
        print(f"❌ Erro ao listar usuários: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    list_users()
