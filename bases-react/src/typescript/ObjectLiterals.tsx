interface Person {
    age: number;
    firstName: string;
    lastName: string;
    address: Address;
}

interface Address {
    country: string;
    houseNo: string;
    street?: string;
}


export const ObjectLiterals = () => {
    const person: Person = {
        age: 38,
        firstName: 'Susana',
        lastName: 'Díaz',
        address: {
            country: 'Canadá',
            houseNo: '615',
        },
    };

    return (
        <>
            <h3> Object Literals </h3> 
            <pre> {JSON.stringify(person, null, 2)} </pre>
        </>
    );
}