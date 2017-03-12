class Head < ApplicationRecord
  validates_presence_of :data_url
  validate :all_valid_data_urls

  DEFAULT_HEADS = %w(bern kony2012 cage hill locke)

  def self.random_default
    where(external_id: DEFAULT_HEADS).to_a.sample
  end

  before_create :set_external_id

  def to_blob
    Base64.decode64(data_url['data:image/png;base64,'.length .. -1])
  end

  def background_to_blob
    return unless background_data_url
    Base64.decode64(background_data_url['data:image/png;base64,'.length .. -1])
  end

  def og_to_blob
    return unless og_data_url
    Base64.decode64(og_data_url['data:image/png;base64,'.length .. -1])
  end

  def get_options
    JSON.parse(options || '{}')
  end

  def options_as_query
    get_options.to_query
  end

  def body_options_as_query
    get_options.slice('hat', 'feet', 'hands').to_query
  end

  private

  def set_external_id
    my_random_external_id = random_external_id
    return set_external_id if Head.where(external_id: my_random_external_id).exists?
    self.external_id = my_random_external_id
  end

  def random_external_id
    "#{rand_chars(2)}#{rand_num}#{rand_chars(2)}"
  end

  def rand_num
    rand(10)
  end

  def rand_chars(length)
    SecureRandom.base58(length)
  end

  def all_valid_data_urls
    return if [data_url, background_data_url, og_data_url].all? { |s| valid_data_url?(s) }
    errors.add(:base, 'not valid data_url')
  end

  def valid_data_url?(val)
    return true unless val.present?
    val.starts_with?("data:image/png;base64,")
  end
end
