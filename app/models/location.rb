class Location < ApplicationRecord
    has_many :users
    has_many :posts

    has_many :users_posts, through: :posts, source: :user

    validates :place_id, uniqueness: true, presence: true
end
