import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const MastersOfLiterature = () => {
    const navigate = useNavigate();

    const authors = [
        {
            name: "William Shakespeare",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/800px-Shakespeare.jpg",
            era: "1564-1616",
            olid: "OL9388A"
        },
        {
            name: "Jane Austen",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/CassandraAusten-JaneAusten%28c.1810%29_hires.jpg/800px-CassandraAusten-JaneAusten%28c.1810%29_hires.jpg",
            era: "1775-1817",
            olid: "OL21594A"
        },
        {
            name: "Charles Dickens",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Dickens_Gurney_head.jpg/800px-Dickens_Gurney_head.jpg",
            era: "1812-1870",
            olid: "OL24638A"
        },
        {
            name: "Mary Shelley",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/RothwellMaryShelley.jpg/800px-RothwellMaryShelley.jpg",
            era: "1797-1851",
            olid: "OL20837A"
        },
        {
            name: "Leo Tolstoy",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg/800px-L.N.Tolstoy_Prokudin-Gorsky.jpg",
            era: "1828-1910",
            olid: "OL26783A"
        },
        {
            name: "J.K. Rowling",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/800px-J._K._Rowling_2010.jpg",
            era: "1965-Present",
            olid: "OL23919A"
        },
        {
            name: "Stephen King",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Comicon.jpg/800px-Stephen_King%2C_Comicon.jpg",
            era: "1947-Present",
            olid: "OL2162284A"
        },
        {
            name: "Margaret Atwood",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Margaret_Atwood_2015.jpg",
            era: "1939-Present",
            olid: "OL16442A"
        },
        {
            name: "Haruki Murakami",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/71/HarukiMurakami_%28cropped%29.png",
            era: "1949-Present",
            olid: "OL34184A"
        },
        {
            name: "Chimamanda Ngozi Adichie",
            image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Chimamanda_Ngozi_Adichie_9374.JPG",
            era: "1977-Present",
            olid: "OL1394244A"
        }
    ];

    const handleAuthorClick = (author) => {
        navigate(`/author/${author.olid}`, {
            state: {
                authorName: author.name,
                authorEra: author.era,
                authorImage: author.image
            }
        });
    };

    return (
        <div className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                        <h2 className="text-4xl font-bold text-gray-900">Masters of Literature</h2>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Celebrating the literary giants whose words have shaped our world and continue to inspire generations of readers
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {authors.map((author, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer"
                            onClick={() => handleAuthorClick(author)}
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                                <div className="aspect-square overflow-hidden bg-gray-200">
                                    <img
                                        src={author.image}
                                        alt={author.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(author.name);
                                        }}
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                    <div className="p-4 w-full">
                                        <p className="text-white text-sm font-semibold">{author.name}</p>
                                        <p className="text-gray-300 text-xs">{author.era}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 text-center md:hidden">
                                <p className="font-semibold text-gray-900 text-sm">{author.name}</p>
                                <p className="text-gray-600 text-xs">{author.era}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MastersOfLiterature;