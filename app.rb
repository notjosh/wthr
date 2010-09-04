require 'rubygems'
require 'sinatra'
require 'barometer'

require 'sinatra/static_assets'

configure :development do
  Sinatra::Application.reset!
  use Rack::Reloader
end

Barometer.google_geocode_key = "ABQIAAAA4eK5taxNtN43UGOupiIWuRQt4fVt5qHCF7oVdAJjNR-dz90u_BR9U8VZDEO21NWuphXw4fjcOj-xig"
set :haml, {:format => :html5 }

get '/' do
  haml :index
end

get '/condition/:condition' do
  begin
    haml params[:condition].to_sym, :locals => { :condition => params[:condition] }
  rescue Errno::ENOENT
    haml :unknown_condition
  end
end

get '/weather/:omgwhere' do
  Barometer.config = { 1 => [:google, :yahoo] }
  barometer = Barometer.new(params[:omgwhere])
  weather = barometer.measure

  haml :omgwhere, :locals => { :weather => weather }
end

not_found do
  '404 bro'
end