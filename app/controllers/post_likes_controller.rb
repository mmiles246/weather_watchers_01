class PostLikesController < ApplicationController

    def create
        @like=PostLike.new(like_params)
        byebug
        if @like.save
            render json: @like, status: :created
        else
            render json: @like.errors, status: :unprocessable_entity
        end        
    end



    private 

    def like_params
        params.permit(:id, :post_id, :user_id)
    end

end
