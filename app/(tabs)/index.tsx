
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import PostItem from "./components/post/Post";
import { useEffect, useState } from "react";

async function fetchPosts() {
    try {
        const resp = await fetch("http://10.92.199.6:3000/posts");
        const data = await resp.json()
        return data
        
    } catch (error) {
        console.log("Erro ao buscar os posts")
        
    }
}



    export default function Timeline () {
        const [posts, setPosts] = useState([])

        // Carrega os posts na hora que o componente é carregado
        useEffect(() => {
            async function loadPost() {
                const apiPost = await fetchPosts()
                setPosts(apiPost)
                
            } 

            loadPost()
        }, []) // é chamado apenas quando a pagina carrega 


        return(
            <View style={styles.container}>
                <View style={styles.newPostContainer}>
                    <TextInput style={styles.newPostInput} multiline placeholder="O que está acontecendo ?"></TextInput>
                    <TouchableOpacity style={styles.postButton}>
                        <Text style={styles.postButtonText}>Postar</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {
                        posts.map((post) => (
                            <PostItem post={post}/>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }

    const styles = StyleSheet.create ({
        container: {
            flex: 1,
            backgroundColor: "#f5f5f5"
        },
        newPostContainer: {
            backgroundColor: "#fff",
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0"
        },
        newPostInput: {
            borderWidth: 1,
            borderColor: "#e0e0e0",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            minHeight: 80,
            textAlignVertical: "top",
            fontSize: 16
        },
        postButton: {
            backgroundColor: "#2196f3",
            paddingHorizontal: 24,
            paddingVertical: 8,
            borderRadius: 20,
            alignSelf: "flex-end"
        },
        postButtonText: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 14
        },
        postHeader: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#e0e0e0",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12
        },
        postInfo: {
            flex: 1
        },
        username: {
            fontWeight: "bold",
            fontSize: 16,
            color: "#333"
        },
        timestamp: {
            fontSize: 12,
            color: "#7777777",
            marginTop: 2
        },
        postContainer: {
            backgroundColor: "#fff",
            marginBottom: 8,
            padding: 16
        },
        posContent: {
            fontSize: 16,
            lineHeight: 22,
            color: "#333",
            marginTop: 12
        },
        postActions: {
            flexDirection: "row",
            borderTopWidth: 1,
            borderTopColor: "#f0f0f0",
            paddingTop: 12
        },
        actionButton: {
            flexDirection: "row",
            alignItems: "center",
            marginRight: 24
        },
        actionText: {
            color: "#777",
            fontSize: 14,
            marginLeft: 4
        }
    })
