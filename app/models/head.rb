class Head < ApplicationRecord
  validates_presence_of :data_url

  before_create do
    self.external_id = SecureRandom.base58(5)
  end
end
