
import React from 'react';
import VentyButton from '../../../components/VentyButton';
import { PlusIcon } from '@heroicons/react/24/solid';

const SectionsEditor: React.FC = () => {
    // This is a placeholder for a more complex drag-and-drop section manager
    const sections = [
        { id: 'hero', name: 'Hero Banner' },
        { id: 'featured', name: 'Featured Products' },
        { id: 'new', name: 'New Arrivals' },
    ];

    return (
        <div className="space-y-3">
            <p className="text-sm text-text-secondary">Drag and drop to reorder sections on your homepage.</p>
            <div className="space-y-2">
                {sections.map(section => (
                    <div key={section.id} className="p-3 bg-bg-secondary rounded-lg border border-bg-tertiary flex justify-between items-center cursor-move">
                        <span className="font-semibold">{section.name}</span>
                        {/* Placeholder for drag handle */}
                        <span>☰</span>
                    </div>
                ))}
            </div>
             <VentyButton variant="secondary" className="!w-full !py-2 !text-sm" onClick={() => alert('Add section functionality not implemented.')}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Section
            </VentyButton>
        </div>
    );
};

export default SectionsEditor;