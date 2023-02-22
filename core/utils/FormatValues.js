import moment from 'moment';
export const FormatDate = (date, format) =>{
    return moment(date).format(format);
}

