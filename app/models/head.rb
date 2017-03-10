class Head < ApplicationRecord
  validates_presence_of :data_url

  before_create do
    self.external_id = SecureRandom.base58(5)
  end

  def to_blob
    Base64.decode64(data_url['data:image/png;base64,'.length .. -1])
  end

  def background_to_blob
    Base64.decode64(background_data_url['data:image/png;base64,'.length .. -1])
  end

end
