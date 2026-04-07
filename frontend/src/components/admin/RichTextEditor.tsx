import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    List,
    ListOrdered,
    Quote,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Link as LinkIcon,
    CheckSquare,
    Undo,
    Redo,
    RemoveFormatting
} from 'lucide-react'

interface RichTextEditorProps {
    content: string
    onChange: (content: string) => void
    placeholder?: string
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null
    }

    const addLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL du lien', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    const ToolbarButton = ({
        onClick,
        isActive = false,
        disabled = false,
        children,
        title
    }: any) => (
        <button
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            disabled={disabled}
            title={title}
            className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${isActive
                ? 'bg-primary text-white shadow-md scale-105'
                : 'text-gray-600 hover:bg-white/60 hover:shadow-sm backdrop-blur-sm'
                } ${disabled ? 'opacity-50 cursor-not-allowed scale-100' : ''}`}
        >
            {children}
        </button>
    )

    return (
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-white/40 backdrop-blur-md border-b border-white/20 shadow-sm z-10 relative">
            <div className="flex flex-wrap items-center gap-1 pr-2 sm:pr-3 sm:border-r border-gray-300/50">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                    title="Titre 1"
                >
                    <Heading1 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Titre 2"
                >
                    <Heading2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Titre 3"
                >
                    <Heading3 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    isActive={editor.isActive('heading', { level: 4 })}
                    title="Titre 4"
                >
                    <Heading4 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
            </div>

            <div className="flex flex-wrap items-center gap-1 px-1 sm:px-3 sm:border-r border-gray-300/50">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Gras"
                >
                    <Bold className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Italique"
                >
                    <Italic className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    title="Souligné"
                >
                    <UnderlineIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    title="Barré"
                >
                    <Strikethrough className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
            </div>

            <div className="flex flex-wrap items-center gap-1 px-1 sm:px-3 sm:border-r border-gray-300/50">
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    title="Aligner à gauche"
                >
                    <AlignLeft className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    title="Centrer"
                >
                    <AlignCenter className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    title="Aligner à droite"
                >
                    <AlignRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    isActive={editor.isActive({ textAlign: 'justify' })}
                    title="Justifier"
                >
                    <AlignJustify className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
            </div>

            <div className="flex flex-wrap items-center gap-1 px-1 sm:px-3 sm:border-r border-gray-300/50">
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Liste à puces"
                >
                    <List className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Liste numérotée"
                >
                    <ListOrdered className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    isActive={editor.isActive('taskList')}
                    title="Liste de tâches"
                >
                    <CheckSquare className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Citation"
                >
                    <Quote className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
            </div>

            <div className="flex flex-wrap items-center gap-1 px-1 sm:px-3 sm:border-r border-gray-300/50">
                <ToolbarButton
                    onClick={addLink}
                    isActive={editor.isActive('link')}
                    title="Ajouter un lien"
                >
                    <LinkIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                    title="Effacer le formatage"
                >
                    <RemoveFormatting className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
            </div>

            <div className="flex flex-wrap items-center gap-1 px-1 sm:px-3">
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    title="Annuler"
                >
                    <Undo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    title="Rétablir"
                >
                    <Redo className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </ToolbarButton>
            </div>
        </div>
    )
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-secondary hover:text-primary underline transition-colors cursor-pointer',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[350px] max-w-none p-4 sm:p-6',
            },
        },
    })

    return (
        <div className="border border-white/40 shadow-premium rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-secondary/50 focus-within:border-secondary transition-all bg-white/60 backdrop-blur-md flex flex-col relative">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="flex-1 overflow-y-auto cursor-text bg-white/40 backdrop-blur-sm" onClick={() => editor?.commands.focus()} />
        </div>
    )
}
