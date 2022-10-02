class User < ApplicationRecord
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

end
