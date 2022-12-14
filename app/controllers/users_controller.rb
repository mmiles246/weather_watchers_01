class UsersController < ApplicationController

    def index
        @users=User.all

        render json: @users
    end
    
    def create
        @current_user=User.create!(user_params)
        if @current_user.valid?
            session[:user_id]=@current_user.id
            render json: @current_user, status: :created
        else
            render json: {errors: @current_user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        user=User.find_by(id: params[:id])
        render json: UserSerializer.new(user).serializable_hash[:data][:attributes]
    end

    def show_current_user
        if @current_user
            render json: @current_user
        else 
            render json: {}, status: :unauthorized
        end
    end

    def update
        user_to_update=User.find_by(id: params[:id])
        user_to_update.update(user_params)
        
        render json: user_to_update
    end

    def find_user
        @user=User.find_by(id: params[:id])
        if @user
            render json: UserSerializer.new(@user).serializable_hash[:data][:attributes]
        else 
            render json: {errors: @user.errors.full_messages}
        end
        # byebug
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
