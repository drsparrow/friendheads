class Head < ApplicationRecord
  validates_presence_of :data_url

  before_create do
    self.external_id = random_external_id
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

  private

  def random_external_id
    "#{rand_chars(2)}#{rand_num}#{rand_chars(2)}"
  end

  def rand_num
    rand(10)
  end

  def rand_chars(length)
    SecureRandom.base58(length)
  end
end
