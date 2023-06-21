import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

interface ErrorAlertProps {
    errorMessage: string;
    errorTitle?: string;
}

const ErrorAlert = ({ errorMessage, errorTitle = 'Server Error' }: ErrorAlertProps) => {
    return (
        <div className="fixed bottom-12 w-full p-4 mx-auto right-0">
            <div className="flex p-4 mx-2 border-l-4 border-red-400 bg-red-50 rounded">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="mb-2 text-md font-medium text-red-700 underline hover:text-red-600">
                        {errorTitle}
                    </p>
                    <p className="text-sm text-red-700">
                        {errorMessage}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ErrorAlert;