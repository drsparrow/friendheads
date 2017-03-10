Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'heads#index'

  resources :heads
  get 'h/:id' => 'heads#show'
  get 'samples/:sample_id' => 'heads#show'
  get 'head_og_image/:id' => 'heads#head_og_image', as: :head_og_image
  get 'head_image/:id' => 'heads#head_image', as: :head_image
  get 'head_background_image/:id' => 'heads#head_background_image', as: :head_background_image
end
