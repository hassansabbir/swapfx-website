export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  rating: string;
  reviews: number;
  isVerified: boolean;
  online: boolean;
  typing?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "them" | "me";
  senderName: string;
  avatarUrl: string;
  message: string;
  time: string;
  isSwapCard?: boolean;
  isCancellationRequest?: boolean;
  cancellationApproved?: boolean;
  isReinstateRequest?: boolean;
}

export interface ChatSession {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  messages: ChatMessage[];
}

export const MOCK_USERS: Record<string, User> = {
  "cameron-williamson": {
    id: "cameron-williamson",
    name: "Cameron Williamson",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    rating: "4.8",
    reviews: 92,
    isVerified: true,
    online: true,
    typing: true,
  },
  "bob-builder": {
    id: "bob-builder",
    name: "Bob Builder",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    rating: "4.7",
    reviews: 56,
    isVerified: true,
    online: true,
  },
  "john-doe": {
    id: "john-doe",
    name: "John Doe",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    rating: "4.9",
    reviews: 128,
    isVerified: true,
    online: true,
  },
  "fahim-ahmed": {
    id: "fahim-ahmed",
    name: "Fahim Ahmed",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    rating: "4.7",
    reviews: 43,
    isVerified: true,
    online: false,
  },
};

export const INITIAL_MOCK_CHATS: ChatSession[] = [
  {
    id: "cameron-williamson",
    participant: MOCK_USERS["cameron-williamson"],
    lastMessage: "Typing...",
    lastMessageTime: "2h Ago",
    unreadCount: 2,
    messages: [
      {
        id: "cw-1",
        sender: "them",
        senderName: "Cameron Williamson",
        avatarUrl: MOCK_USERS["cameron-williamson"].avatarUrl,
        message: "Hey! Are you still looking to exchange GBP for PKR?",
        time: "Oct 24, 14:15:20 UTC",
      },
      {
        id: "cw-2",
        sender: "me",
        senderName: "Nazrul",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
        message: "Yes I am! What rate can you offer?",
        time: "Oct 24, 14:18:10 UTC",
      },
      {
        id: "cw-3",
        sender: "them",
        senderName: "Cameron Williamson",
        avatarUrl: MOCK_USERS["cameron-williamson"].avatarUrl,
        message: "I can do 380 PKR per GBP. Does that work for you?",
        time: "Oct 24, 14:20:05 UTC",
      },
    ],
  },
  {
    id: "bob-builder",
    participant: MOCK_USERS["bob-builder"],
    lastMessage: "Hope you like it",
    lastMessageTime: "2h Ago",
    messages: [
      {
        id: "bb-1",
        sender: "them",
        senderName: "Bob Builder",
        avatarUrl: MOCK_USERS["bob-builder"].avatarUrl,
        message: "Hello ! Nazrul How are you?",
        time: "Oct 24, 14:32:01 UTC",
      },
      {
        id: "bb-2",
        sender: "me",
        senderName: "Nazrul",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
        message: "Hello! Jhon abraham",
        time: "Oct 24, 14:32:01 UTC",
      },
      {
        id: "bb-3",
        sender: "me",
        senderName: "Nazrul",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
        message: "You did your job well!",
        time: "Oct 24, 14:32:01 UTC",
      },
      {
        id: "bb-4",
        sender: "them",
        senderName: "Bob Builder",
        avatarUrl: MOCK_USERS["bob-builder"].avatarUrl,
        message: "Have a great working week!!",
        time: "Oct 24, 14:32:01 UTC",
      },
      {
        id: "bb-5",
        sender: "them",
        senderName: "Bob Builder",
        avatarUrl: MOCK_USERS["bob-builder"].avatarUrl,
        message: "Hope you like it",
        time: "Oct 24, 14:32:01 UTC",
      },
      {
        id: "bb-6",
        sender: "me",
        senderName: "Nazrul",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
        message: "You did your job well!",
        time: "Oct 24, 14:32:01 UTC",
      },
    ],
  },
  {
    id: "john-doe",
    participant: MOCK_USERS["john-doe"],
    lastMessage: "I am ready to transfer, let's complete the swap",
    lastMessageTime: "2h Ago",
    unreadCount: 2,
    messages: [
      {
        id: "jd-1",
        sender: "them",
        senderName: "John Doe",
        avatarUrl: MOCK_USERS["john-doe"].avatarUrl,
        message: "Hi! I just saw your swap listing on the marketplace.",
        time: "Oct 24, 13:05:44 UTC",
      },
      {
        id: "jd-2",
        sender: "me",
        senderName: "Nazrul",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
        message: "Awesome, let's chat about it!",
        time: "Oct 24, 13:08:12 UTC",
      },
      {
        id: "jd-3",
        sender: "them",
        senderName: "John Doe",
        avatarUrl: MOCK_USERS["john-doe"].avatarUrl,
        message: "I am ready to transfer, let's complete the swap",
        time: "Oct 24, 13:10:00 UTC",
      },
    ],
  },
  {
    id: "fahim-ahmed",
    participant: MOCK_USERS["fahim-ahmed"],
    lastMessage: "Sure, talk to you later.",
    lastMessageTime: "2h Ago",
    messages: [
      {
        id: "fa-1",
        sender: "them",
        senderName: "Fahim Ahmed",
        avatarUrl: MOCK_USERS["fahim-ahmed"].avatarUrl,
        message: "Hi, let's discuss details.",
        time: "Oct 24, 10:10:00 UTC",
      },
      {
        id: "fa-2",
        sender: "me",
        senderName: "Nazrul",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
        message: "Hello Fahim!",
        time: "Oct 24, 10:12:00 UTC",
      },
    ],
  },
];
