"""Script para inicializar o banco de dados com usuário admin"""
from sqlalchemy.orm import Session
import models
import auth
from database import engine, SessionLocal

# Criar tabelas
models.Base.metadata.create_all(bind=engine)

def init_db():
    db = SessionLocal()
    try:
        # Verificar se já existe usuário admin
        admin = db.query(models.User).filter(models.User.username == "admin").first()
        
        if not admin:
            # Criar usuário admin
            hashed_password = auth.get_password_hash("admin123")
            admin = models.User(
                username="admin",
                email="admin@nexus.com",
                hashed_password=hashed_password,
                role="admin"
            )
            db.add(admin)
            db.commit()
            print("✅ Usuário admin criado com sucesso!")
            print("   Username: admin")
            print("   Password: admin123")
        else:
            print("ℹ️  Usuário admin já existe")
            
    except Exception as e:
        print(f"❌ Erro ao criar usuário admin: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
