class CommentLikesController < ApplicationController

    def create
        comment_like=CommentLike.create(comment_like_params)
        # byebug
        render json: comment_like
    end

    def destory
        comment=Comment.find_by(id: params[:comment_id])
        # buebug
        comment_likes=CommentLike.where(comment_id: params[:comment_id])
        comment_likes.each do |like|
            if like.comment_id === comment.id
                like.destroy
            end
        end
    end



    private

    def comment_like_params
        params.permit(:id, :user_id, :comment_id)
    end
end
