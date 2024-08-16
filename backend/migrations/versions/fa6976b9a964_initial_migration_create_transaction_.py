"""Initial migration - create Transaction model

Revision ID: fa6976b9a964
Revises: 99849636b731
Create Date: 2024-08-09 18:47:55.840569

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa6976b9a964'
down_revision = '99849636b731'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('transaction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('payment_method', sa.String(length=50), nullable=False),
    sa.Column('vendor_supplier', sa.String(length=100), nullable=True),
    sa.Column('invoice_number', sa.String(length=50), nullable=True),
    sa.Column('receipt_document', sa.String(length=50), nullable=True),
    sa.Column('remarks', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('invoice_number')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transaction')
    # ### end Alembic commands ###
