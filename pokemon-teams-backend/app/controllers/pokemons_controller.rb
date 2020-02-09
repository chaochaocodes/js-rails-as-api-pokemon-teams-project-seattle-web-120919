class PokemonsController < ApplicationController
    before_action :find_pokemon, only: [:show, :destroy]

    def index
        @pokemons = Pokemon.all 
        render json: @pokemons 
    end
    
    def new
        @pokemon = Pokemon.new
    end
    
    # Include error handling in the create to account for reaching the trainer's limit of 6 pokemon.
    def create
        @pokemon = Pokemon.create(pokemon_params)
        if @pokemon.save
            render json: @pokemon
        else 
            render :new
            puts 'You have reached your limit of 6 pokemon.'
        end
    end

    private 

    def find_pokemon
        @pokemon = Pokemon.find(params[:id])
        render json: @pokemon
    end

    def pokemon_params
        params.require(:pokemon).permit(:species, :nickname, :trainer_id)
    end
end