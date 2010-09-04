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
  # Clear = clear
  # Cloudy = cloudy
  # Flurries = flurries
  # Fog = fog
  # Hazy = hazy
  # Mostly Cloudy = mostlycloudy
  # Mostly Sunny = mostlysunny
  # Partly Cloudy = partlycloudy
  # Partly Sunny = partlysunny
  # Rain = rain
  # Sleet = sleet
  # Snow = snow
  # Sunny = sunny
  # Thunderstorms = tstorms
  # Unknown = unknown

  begin
    haml params[:condition].to_sym, :locals => { :condition => params[:condition] }
  rescue Errno::ENOENT
    haml :unknown_condition
  end
end

get '/location/:omgwhere' do
  @omgwhere = params[:omgwhere]
  puts params[:omgwhere]

  Barometer.config = { 1 => [:wunderground] }
  barometer = Barometer.new(@omgwhere)
  weather = barometer.measure

  haml :omgwhere, :locals => { :weather => weather }
end

not_found do
  '404 bro'
end