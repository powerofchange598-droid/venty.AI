
import React from 'react';
import { StoreConfig } from '../../../types';

interface LayoutEditorProps {
    layout: StoreConfig['layout'];
    onLayoutChange: <K extends keyof StoreConfig['layout']>(key: K, value: StoreConfig['layout'][K]) => void;
}

type LayoutOption<T> = { id: T; label: string };

const gridOptions: LayoutOption<StoreConfig['layout']['gridStyle']>[] = [ { id: '2x2', label: '2x2 Grid' }, { id: '3x3', label: '3x3 Grid' }, { id: 'list', label: 'List' }, { id: 'masonry', label: 'Masonry' }, ];
const cardStyleOptions: LayoutOption<StoreConfig['layout']['cardStyle']>[] = [ { id: 'hard-shadow', label: 'Hard Shadow' }, { id: 'soft-shadow', label: 'Soft Shadow' }, { id: 'border', label: 'Border' }, ];
const borderRadiusOptions: LayoutOption<StoreConfig['layout']['cardBorderRadius']>[] = [ { id: 'sharp', label: 'Sharp' }, { id: 'rounded', label: 'Rounded' }, { id: 'very-rounded', label: 'Very Rounded' }, ];
const spacingOptions: LayoutOption<StoreConfig['layout']['spacing']>[] = [ { id: 'tight', label: 'Tight' }, { id: 'normal', label: 'Normal' }, { id: 'loose', label: 'Loose' }, ];

const LayoutEditor: React.FC<LayoutEditorProps> = ({ layout, onLayoutChange }) => {
    return (
        <div className="space-y-4">
            {(
                [
                    { title: 'Grid Style', options: gridOptions, key: 'gridStyle' },
                    { title: 'Card Style', options: cardStyleOptions, key: 'cardStyle' },
                    { title: 'Card Corners', options: borderRadiusOptions, key: 'cardBorderRadius' },
                    { title: 'Spacing', options: spacingOptions, key: 'spacing' },
                ] as const
            ).map(({ title, options, key }) => (
                <div key={key}>
                    <label className="font-medium text-sm">{title}</label>
                    <select
                        value={layout[key]}
                        onChange={(e) => onLayoutChange(key, e.target.value as any)}
                        className="w-full mt-1"
                    >
                        {options.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                    </select>
                </div>
            ))}
        </div>
    );
};

export default LayoutEditor;