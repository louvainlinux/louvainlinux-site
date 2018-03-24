/* config/env/index.js
 *
 * Copyright (C) 2018 Louvain-li-Nux <info@louvainlinux.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = (function (env) {
    var config = {};

    switch (env) {
        case 'production':
        config = require('./production');
        break;
        case 'development':
        config = require('./development');
        break;
        case 'testing':
        config = require('./testing');
        break;
        case 'staging':
        config = require('./staging');
        break;
        default:
        console.error('NODE_ENV environment variable not set');
        process.exit(1);
    }

    return config;
})(process.env.NODE_ENV);
