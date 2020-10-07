import history from '../../history/history';
import routes from '../../routes/routes';

type ErrorHandlers = {
    [key: number]: any,
    default: any
}

const ERROR_HANDLERS: ErrorHandlers = {
    400: () => history.replace(routes.badRequest),
    404: () => history.replace(routes.notFound),
    500: () => history.replace(routes.notRespond),
    default: (error: any) => Promise.reject(error),
};

export default (error: { getMetaInfo: () => { status: number; }; }) => {
    if (!error || !error.getMetaInfo) {
        return Promise.reject(error);
    }

    const {status} = error.getMetaInfo();
    const errorHandler = ERROR_HANDLERS[status] || ERROR_HANDLERS.default;
    return errorHandler(error);
};
