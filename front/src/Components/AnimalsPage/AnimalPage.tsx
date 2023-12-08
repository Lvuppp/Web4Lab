import React, { useState, useEffect } from 'react';
import './AnimalPage.css';
import {apiClient} from "../../api/api";
import {Animal, AnimalsResponse} from "../../api/api.responses";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {useAuth} from "../../AuthProvider/AuthProvider";
    const AnimalCatalogPage: React.FC = () => {
    const [animals, setAnimals] = useState<AnimalsResponse>([]);
    const [sort, setSort] = useState<string | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const params: Record<string, string> = {};
                if (sort) params.sort = sort;
                if (search) params.search = search;

                const response = await apiClient.get<AnimalsResponse>('/animals', params);
                setAnimals(response.data);
            } catch (error: any) {
                toast.error('Error fetching animals:', error.message);
            }
        };

        fetchAnimals();
    }, [sort, search]);

    const handleSortChange = () => {
        setSort((prevSort) => (prevSort === 'ASC' ? 'DESC' : 'ASC'));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className="animal-catalog">
            <h1>Animal Catalog</h1>
            {isAuthenticated && <div className="filter-search-container">
                <div className="sort-container">
                    <label>
                        Sort:
                        <input type="checkbox" checked={sort === 'ASC'} onChange={handleSortChange} />
                        Ascending
                    </label>
                </div>
                <div className="search-container">
                    <label>
                        Search:
                        <input type="text" value={search || ''} onChange={handleSearchChange} />
                    </label>
                </div>
            </div> }
            <div className="animal-catalog-container">
                <div className="animal-list">
                    {animals.map((animal) => (
                        <AnimalCard key={animal.id} animal={animal} />
                    ))}
                </div>
            </div>
        </div>
    );
};

interface AnimalCardProps {
    animal: Animal;
}

class AnimalCard extends React.Component<AnimalCardProps> {
    render() {
        const { animal } = this.props;

        return (
            <div className="animal-card">
                <Link to={`/animals/${animal.id}`}>
                    <h2>{animal.name}</h2>
                </Link>
                <p>Species: {animal.species}</p>
                <p>Arrival Date: {animal.arriveDate}</p>
                <p>Food Type: {animal.foodType}</p>
                <p>Birth Date: {animal.birthDate}</p>
                <p>Country: {animal.country}</p>
            </div>
        );
    }
}

export default AnimalCatalogPage;
