import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Notification } from 'controls';
import { ButtonType } from 'controls/Button';
import { GetCoursesDocument, useAddCourseMutation } from 'types';

const Layout = ({ children, title }: { children: ReactNode, title: string | ReactNode }) => (
    <section className="section">
        <h1 className="title">{title}</h1>
        {children}
    </section>
);

interface InputProps {
    label: string
    name: string
    placeholder: string
    loading?: boolean
    required?: boolean
    value: string
    onChange: (name: string, value: string) => void
}

const Input = ({ label, name, placeholder, loading, required, value, onChange }: InputProps) => (
    <div className="field">
        <label htmlFor={name} className="label">{label}</label>
        <p className="control">
            <input
                name={name}
                className="input"
                type="text"
                title={label}
                placeholder={placeholder}
                disabled={!!loading}
                required={required}
                value={value}
                onChange={e => onChange(name, e.target.value)}
            />
        </p>
    </div>
);

const CourseCreatePage = () => {
    const [data, setData] = useState({ title: '', description: '' });
    const [addCourse, { loading, error, data: addData }] = useAddCourseMutation({
        refetchQueries: [
            { query: GetCoursesDocument }
        ]
    });

    useEffect(() => {
        if (addData) {
            setData(addData.addCourse.course);
        }
    }, [addData]);

    const handleChange = (name: string, value: string) => setData({ ...data, [name]: value });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        addCourse({
            variables: {
                input: data
            }
        });
    };

    if (addData?.addCourse?.course) {
        return <Navigate to={`/courses/${addData.addCourse.course.id}`} />;
    }

    return (
        <Layout title="Create new course">
            <form onSubmit={handleSubmit}>
                <Input
                    label="Title" name="title"
                    placeholder="Please enter course title" loading={loading} required
                    value={data.title} onChange={handleChange}
                />
                <Input
                    label="Description" name="description"
                    placeholder="Please enter course description" loading={loading} required
                    value={data.description} onChange={handleChange}
                />
                <div className="control">
                    <Button type={ButtonType.Submit} loading={loading}>Save</Button>
                </div>
                {!!error && <Notification message="You cannot add the course!" />}
            </form>
        </Layout>
    );
};

export default CourseCreatePage;
