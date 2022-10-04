class LocationsController < ApplicationController

    def index
        @locations = Location.all

        render json: @locations
    end

    def create
        location = Location.create(location_params)
        render json: location, status: :created
    end

    def place_id
        place_ids = []
        @locations = Location.all
        @locations.each do |location|
            place_ids.push(location.place_id)
        end
        render json: place_ids
    end

    def location_images
        @current_location=Location.find_by(place_id: params[:place_id]) 
        byebug
        render json: LocationSerializer.new(@current_location).serializable_hash[:data][:attributes]
    end

    private

    def location_params
        params.permit(:id, :place_id, :name, :posts, :users)
    end
    
end
