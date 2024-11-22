// src/pages/ConfirmToken.jsx
import {useEffect} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import {useMutation} from '@tanstack/react-query';
import {confirmToken} from '../API/AuthAPI.js';
import {toast} from 'react-hot-toast';
import LoadingComponent from '../components/Loading/LoadingComponent.jsx';

const ConfirmToken = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const {mutate, data, isLoading, isError} = useMutation({
        mutationKey: ['confirmToken'],
        mutationFn: (token) => confirmToken(token),
        onSuccess: () => {
            toast.success('Token confirmed successfully');
            navigate('/');
        },
        onError: (error) => {
            toast.error(error.message || 'Token confirmation failed');
            navigate('/');
        },
    });

    // console.log(`data`, data)


    useEffect(() => {
        if (token) {
            mutate(token);
        } else {
            toast.error('Invalid token');
            navigate('/');
        }
    }, []);

    if (isLoading) {
        return <LoadingComponent/>;
    }

    if (isError || !data?.is_activated) {
        return (
            <div>
                <h1>Token confirmation failed</h1>
            </div>
        );
    }
    return (
        <div>
            <h1>Token confirmation failed</h1>
        </div>

    )
};

export default ConfirmToken;