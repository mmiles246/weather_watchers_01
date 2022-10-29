class User < ApplicationRecord
  include ActiveModel::Serializers::JSON
  
  has_secure_password

  belongs_to :location

  has_many :posts
  has_many :comments
  has_many :post_likes
  has_many :comment_likes

  has_many :locations, through: :posts
  has_many :liked_posts, through: :post_likes, source: :post
  has_many :posts_commented_on, through: :comments, source: :post
  has_many :liked_comments, through: :comment_likes, source: :comment

  has_one_attached :avatar

  validates :email, uniqueness: true, presence: true
  validates :username, uniqueness: true, presence: true

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end

end
