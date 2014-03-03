# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  provider               :string(255)
#  uid                    :string(255)
#  created_at             :datetime
#  updated_at             :datetime
#  location_id            :integer
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable

  # Relationships
  has_many :items, through: :transactions
  has_many :transactions
  belongs_to :location

   # Omniauth helper methods
   def self.from_omniauth(auth)
     where(auth.slice(:provider, :uid)).first_or_create do |user|
       user.provider = auth.provider
       user.uid = auth.uid
       user.email = auth.info.email
     end
   end

   def self.new_with_session(params, session)
     if session["devise.user_attributes"]
       new(session["devise.user_attributes"], without_protection: true) do |user|
         user.attributes = params
         user.valid?
       end
     else
       super
     end
   end

   def password_required?
     super && provider.blank?
   end

   def update_with_password(params, *options)
     if encrypted_password.blank?
       update_attributes(params, *options)
     else
       super
     end
   end
end
