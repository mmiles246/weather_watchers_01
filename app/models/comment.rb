class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post

  has_many :comment_likes

  has_many :users_that_liked, through: :comment_likes, source: :user

  def users_who_liked
    user_ids=Array.new
    users_that_liked.each do |user|
        user_ids.push(user.id)
    end
    user_ids
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
