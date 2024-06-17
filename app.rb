# frozen_string_literal: true

require 'sinatra/base'
require 'logger'
#Framework is for doing the busy work stuff? - sinatra, stiches the pages together
    # App is the main application where all your logic & routing will go
class App < Sinatra::Base
  set :erb, escape_html: true
  enable :sessions

  attr_reader :logger

  def initialize
    super
    @logger = Logger.new('log/app.log')
  end

  def title
    'Davids Blender App'
  end

  get '/examples' do
    erb(:examples)      #erb = embedded ruby
  end

  get '/' do
    logger.info('requsting the index')
    @flash = session.delete(:flash) || { info: 'Welcome to Summer Institute!' }
    erb(:index)
  end
  
  get '/projects/new' do
    erb(:new_project)
  end
  
  post '/projects/new' do
    redirect(url("/projects/new"))
  end
end
