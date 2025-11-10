"""Script para resetar a senha do admin"""
from sqlalchemy.orm import Session
import models
import auth
from database import SessionLocal

def reset_admin_password():
    db = SessionLocal()
    try:
        # Buscar usuário admin
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        
        if admin:
            # Resetar senha
            new_password = "admin123"
            admin.hashed_password = auth.get_password_hash(new_password)
            db.commit()
            print("✅ Senha do admin resetada com sucesso!")
            print("   Username: admin")
            print("   Password: admin123")
        else:
            print("❌ Usuário admin não encontrado")
            
    except Exception as e:
        print(f"❌ Erro ao resetar senha: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin_password()
