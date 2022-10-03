class UsersController < ApplicationController

    def index
        @users=User.all

        render json: @users
    end
    
    def create
        @current_user=User.create(user_params)
        byebug
        if @current_user.valid?
            session[:user_id]=@current_user.id
            render json: @current_user, status: :created
        else
            render json: {errors: @current_user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        if @current_user
            render json: @current_user
        else 
            render json: {}, status: :unauthorized
        end
    end

    def avatar_upload
        @current_user=User.find_by(id: session[:user_id])
        @current_user.update(user_params)
        render json: @current_user
    end

    def my_posts
        @current_user=User.find_by(id: session[:user_id])
        @my_posts=@current_user.posts
        PostSerializer.new(@my_posts).serializable_hash[:data][:attributes]
    end

    private

    def user_params
        params.permit(:id, :username, :location_id, :password, :email, :bio, :avatar, :avatar_url, :posts)
    end
    
end
