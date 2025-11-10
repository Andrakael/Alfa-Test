"""Script para configurar senhas de todos os usuários"""
from sqlalchemy.orm import Session
import models
import auth
from database import SessionLocal

def setup_users():
    db = SessionLocal()
    try:
        # Senhas padrão
        users_config = {
            'admin': 'GILGAMESH999',
            'gerente': 'GILGAMESH99',
            'usuario': 'GILGAMESH9'
        }
        
        for username, password in users_config.items():
            user = db.query(models.User).filter(models.User.username == username).first()
            
            if user:
                user.hashed_password = auth.get_password_hash(password)
                print(f"✅ Senha atualizada para: {username}")
            else:
                print(f"❌ Usuário não encontrado: {username}")
        
        db.commit()
        
        print("\n" + "="*60)
        print("CREDENCIAIS CONFIGURADAS:")
        print("="*60)
        for username, password in users_config.items():
            user = db.query(models.User).filter(models.User.username == username).first()
            if user:
                print(f"Username: {username:10} | Senha: {password:15} | Role: {user.role}")
        print("="*60)
            
    except Exception as e:
        print(f"❌ Erro ao configurar usuários: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    setup_users()
