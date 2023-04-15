const {fDateTime} = require('./timeFormat');

module.exports  = {
    sum: (a, b) => a + b,
    date: (date = "0") => fDateTime(date),
    sortable: (field, sort) => {

        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'bx bx-sort-alt-2',
            asc: 'bx bx-sort-down',
            desc: 'bx bx-sort-up',
        }

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }
        const type = types[sortType];
        const icon = icons[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
                    <i class='${icon}'></i>
                </a>`
    }
}
