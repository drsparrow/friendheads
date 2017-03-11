Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'heads#index'

  resources :heads

  resources :demos

  get '/:id' => 'heads#show'
  get 'samples/:sample_id' => 'heads#show'

  get 'head_og_image/:id' => 'head_images#head_og_image', as: :head_og_image
  get 'head_image/:id' => 'head_images#head_image', as: :head_image
  get 'head_background_image/:id' => 'head_images#head_background_image', as: :head_background_image
end
