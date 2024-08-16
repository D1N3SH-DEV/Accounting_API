# manage.py
from app import create_app, db
from flask_migrate import Migrate
from flask.cli import FlaskGroup

app = create_app()
migrate = Migrate(app, db)
cli = FlaskGroup(create_app=create_app)

@cli.command("create-db")
def create_db():
    """Create the database tables."""
    with app.app_context():
        db.create_all()
        print("Database created.")

@cli.command("drop-db")
def drop_db():
    """Drop the database tables."""
    with app.app_context():
        db.drop_all()
        print("Database dropped.")

if __name__ == "__main__":
    cli()
