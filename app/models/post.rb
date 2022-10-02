class Post < ApplicationRecord
  include ActiveModel::Serializers::JSON
  belongs_to :user
  belongs_to :location

  has_many :post_likes
  has_many :comments

  has_many :users_that_liked, through: :post_likes, source: :user
  has_many :users_that_commented, through: :comments, source: :user
  
  has_one_attached :image

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end

end
