"""
Script para inicializar o banco de dados com usuários padrão
"""
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
import auth

def init_database():
    """Criar tabelas e usuários padrão"""
    print("🔧 Criando tabelas...")
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Verificar se já existem usuários
        existing_users = db.query(models.User).count()
        
        if existing_users > 0:
            print(f"✅ Banco já possui {existing_users} usuários")
            return
        
        print("👥 Criando usuários padrão...")
        
        # Criar usuários padrão
        users = [
            {
                "username": "admin",
                "email": "admin@nexus.com",
                "password": "admin123",
                "role": "admin"
            },
            {
                "username": "gerente",
                "email": "gerente@nexus.com",
                "password": "gerente123",
                "role": "gerente"
            },
            {
                "username": "usuario",
                "email": "usuario@nexus.com",
                "password": "usuario123",
                "role": "usuario"
            }
        ]
        
        for user_data in users:
            hashed_password = auth.get_password_hash(user_data["password"])
            db_user = models.User(
                username=user_data["username"],
                email=user_data["email"],
                hashed_password=hashed_password,
                role=user_data["role"]
            )
            db.add(db_user)
            print(f"  ✅ Criado: {user_data['username']} ({user_data['role']})")
        
        db.commit()
        print("\n🎉 Banco de dados inicializado com sucesso!")
        print("\n📋 Usuários criados:")
        print("  • admin / admin123 (Administrador)")
        print("  • gerente / gerente123 (Gerente)")
        print("  • usuario / usuario123 (Usuário)")
        
    except Exception as e:
        print(f"❌ Erro ao inicializar banco: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
