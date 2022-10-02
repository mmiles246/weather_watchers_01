class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.text :bio
      t.belongs_to :location, null: false, foreign_key: true

      t.timestamps
    end
  end
end
