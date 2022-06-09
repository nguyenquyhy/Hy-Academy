import './SearchBar.css';
import { useEffect, useState } from 'react';
import { useSearchCoursesLazyQuery } from 'types';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isShowing, setShowing] = useState(false);

    const [search, { data, loading, error }] = useSearchCoursesLazyQuery();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchValue(value);
        }, 500);
        return () => {
            clearTimeout(timeout);
        };
    }, [value]);

    useEffect(() => {
        if (searchValue) {
            setShowing(true);
            search({
                variables: {
                    input: {
                        query: searchValue
                    }
                }
            });
        } else {
            setShowing(false);
        }
    }, [searchValue]);

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            {isShowing && <div className="search-bar-background" onClick={() => setShowing(false)} onKeyDown={() => setShowing(false)} />}
            <div className="search-bar field has-addons">
                <p className="control">
                    <input className="input" type="text" placeholder="Find a course" value={value} onChange={e => setValue(e.target.value)} onFocus={() => setShowing(true)} />
                </p>
                <p className="control">
                    <button className="button">
                        Search
                    </button>
                </p>
                {isShowing && !!searchValue && (
                    <div className="result">
                        {loading && (
                            <>
                                <p>Searching for <strong>{searchValue}</strong></p>
                                <progress className="progress is-small is-primary" max="100">Searching</progress>
                            </>
                        )}
                        {data?.searchCourses?.nodes && data.searchCourses.nodes.map(item => (
                            <Link className="button is-text is-fullwidth" to={`/courses/${item.id}`} key={item.id} onClick={() => setShowing(false)}>{item.title}</Link>
                        ))}
                        {data?.searchCourses?.nodes && data.searchCourses.nodes.length === 0 && <>No result for <strong>{searchValue}</strong></>}
                        {error && <p>{error.message}</p>}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchBar;
