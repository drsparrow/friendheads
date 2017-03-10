class Head < ApplicationRecord
  validates_presence_of :data_url

  before_create do
    self.external_id = rand(10).to_s + SecureRandom.base58(4)
  end

  def to_blob
    Base64.decode64(data_url['data:image/png;base64,'.length .. -1])
  end

  def background_to_blob
    return unless background_data_url
    Base64.decode64(background_data_url['data:image/png;base64,'.length .. -1])
  end

  def get_options
    JSON.parse(options || '{}')
  end

  def options_as_query
    get_options.to_query
  end
end
