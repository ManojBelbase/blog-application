import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface EditorProps {
    value: string;
    onChange: (content: string) => void;
    label?: string;
    error?: string;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange, label, error }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-(--text-secondary)">
                    {label}
                </label>
            )}
            <div className={`editor-container ${error ? 'border-red-500' : ''}`}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    className="bg-(--bg-primary) text-(--text-primary) border-(--border-color)"
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['link', 'clean']
                        ],
                    }}
                />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}

            <style>{`
                .quill {
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    overflow: hidden;
                }
                .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 1px solid var(--border-color);
                    background: var(--bg-secondary);
                }
                .ql-container.ql-snow {
                    border: none;
                    min-h: 200px;
                    font-size: 14px;
                }
                .ql-editor {
                    min-height: 200px;
                }
                .ql-snow .ql-stroke {
                    stroke: var(--text-primary);
                }
                .ql-snow .ql-fill {
                    fill: var(--text-primary);
                }
                .ql-snow .ql-picker {
                    color: var(--text-primary);
                }
            `}</style>
        </div>
    );
};
