class PostLikesController < ApplicationController


    def index
        post_likes=PostLike.all
        render json: post_likes
    end

    def like_image
        byebug
        post_like=PostLike.create(post_like_params)
        byebug
        # if post_like.save
        #     render json: post_like, status: :created
        # else
        #     render json: post_like.errors, status: :unprocessable_entity
        # end 
        render json: post_like       
    end

    def destroy
        @current_user=User.find_by_id(session[:user_id])
        byebug
        @post_likes=PostLike.where(post_id: params[:post_id])
        byebug
        @post_likes.each do |like|
            if like.user_id === @current_user.id
                like.destroy
            end
        end
        head :no_content
    end



    private 

    def post_like_params
        params.permit(:id, :post_id, :user_id)
    end

end
