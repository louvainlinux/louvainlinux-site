###

ressources/assets/scripts/app.coffee

Copyright (C) 2017 Denis Pettens <denis.pettens@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

###

$(document).ready ->

  ## Header hamburger icon ##

  $('#header__icon').click (e) ->
    e.preventDefault()
    $('body').toggleClass 'with--sidebar'
    return

  $('#site-cache').click (e) ->
    $('body').removeClass 'with--sidebar'
    return

  ## Alert message ##

  $('.close').click ->
    $(this).parent().fadeOut()
    return

  ## Home Slider ##

  if $('#home__slider').length
    $('#home__slider').slick
      speed: 800
      autoplay: true
      dots: true
      pauseOnDotsHover: true
      dotsClass: 'slider-dots'
      prevArrow: '<button type="button" class="slider-prev"><i class="fa fa-arrow-left"></i></button>'
      nextArrow: '<button type="button" class="slider-next"><i class="fa fa-arrow-right"></i></button>'
  	return
