"""Script para mudar a senha do admin"""
from sqlalchemy.orm import Session
import models
import auth
from database import SessionLocal

def change_admin_password(new_password: str):
    db = SessionLocal()
    try:
        # Buscar usuário admin
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        
        if admin:
            # Mudar senha
            admin.hashed_password = auth.get_password_hash(new_password)
            db.commit()
            print("✅ Senha do admin alterada com sucesso!")
            print(f"   Username: admin")
            print(f"   Password: {new_password}")
        else:
            print("❌ Usuário admin não encontrado")
            
    except Exception as e:
        print(f"❌ Erro ao alterar senha: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    change_admin_password("GILGAMESH999")
