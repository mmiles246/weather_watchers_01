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

  def users_who_liked
    user_ids=Array.new
    users_that_liked.each do |user|
        user_ids.push(user.id)
    end
    user_ids
  end

  def date_posted
    attributes['created_at'].strftime("%B %d, %Y")
  end

  def time_posted
    attributes['created_at'].strftime("%I:%M%p")
  end

  def created_at
    attributes['created_at'].strftime("%Y-%m-%d")
  end

  # def comment_content
  #   comment_content=Array.new
  #   comments.each do |comment|
  #     comment={comment.user.username: comment.content}
  #     comment_content << comment
  #   end
  #   comment_content
  # end


end
