FactoryGirl.define do
  factory :location do |f|
    f.city { Faker::Address.city}
    f.state { Faker::Address.state}
  end
end
